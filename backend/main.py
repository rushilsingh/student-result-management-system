from fastapi import FastAPI
from dotenv import dotenv_values
from pymongo import MongoClient
from student_routes import router as student_router
from course_routes import router as course_router
from result_routes import router as result_router

from fastapi.middleware.cors import CORSMiddleware

config = dotenv_values(".env")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pymongo.errors import ServerSelectionTimeoutError


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = MongoClient(config["ATLAS_URI"])

    try:
        app.mongodb_client.admin.command(
            "ismaster"
        )  # Check if the MongoDB server is running
        app.database = app.mongodb_client[config["DB_NAME"]]

        # Create unique indexes
        app.database.students.create_index(
            [("first_name", 1), ("last_name", 1)], unique=True
        )
        app.database.courses.create_index([("name", 1)], unique=True)
        app.database.results.create_index(
            [("student_id", 1), ("course_id", 1), ("grade", 1)], unique=True
        )

        print("Connected to the MongoDB database!")

    except ServerSelectionTimeoutError:
        print("Error connecting to the MongoDB database!")
        app.mongodb_client.close()


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(student_router, tags=["students"], prefix="/student")
app.include_router(course_router, tags=["courses"], prefix="/course")
app.include_router(result_router, tags=["results"], prefix="/result")
