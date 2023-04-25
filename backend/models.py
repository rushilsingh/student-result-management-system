import uuid
from pydantic import BaseModel, Field
import datetime


class Student(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    first_name: str = Field(...)
    last_name: str = Field(...)
    email_address: str = Field(...)
    date_of_birth: datetime.date = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "first_name": "Rushil",
                "last_name": "Singh",
                "email_address": "rushil@email.com",
                "date_of_birth": "1999-07-20",
            }
        }


class Course(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "Mathematics",
            }
        }


class Result(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    student_id: str = Field(...)
    course_id: str = Field(...)
    grade: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "student_id": "dbaf1486-c1e6-48b6-a207-6db3c3b9a6f2",
                "course_id": "1b6e4117-30c3-4a9e-b58d-6d48f6ca8b29",
                "grade": "A",
            }
        }
