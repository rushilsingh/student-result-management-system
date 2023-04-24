import uuid
from typing import Optional
from pydantic import BaseModel, Field


class Student(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    first_name: str = Field(...)
    last_name: str = Field(...)
    email_address: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "first_name": "Rushil",
                "last_name": "Singh",
                "email_address": "rushil@email.com",
            }
        }


class StudentUpdate(BaseModel):
    email_address: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "email_address": "rushil2@email.com",
            }
        }
