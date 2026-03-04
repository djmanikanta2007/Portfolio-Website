from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    projectType: str
    message: str
    submittedAt: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    projectType: str
    message: str

class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None
