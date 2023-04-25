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
