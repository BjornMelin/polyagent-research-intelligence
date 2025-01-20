from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables from .env.local file
load_dotenv('.env.local')

# Get database URL from environment variable
DATABASE_URL = os.getenv("POSTGRES_DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set in .env.local")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    queries = relationship("Query", back_populates="user")

class Query(Base):
    __tablename__ = "queries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    query_text = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    workflow_state = relationship("WorkflowState", back_populates="query", uselist=False)
    user = relationship("User", back_populates="queries")

class WorkflowState(Base):
    __tablename__ = "workflow_states"

    id = Column(Integer, primary_key=True, index=True)
    query_id = Column(Integer, ForeignKey("queries.id"))
    status = Column(String)  # e.g., "processing", "completed", "failed"
    current_step = Column(String)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    query = relationship("Query", back_populates="workflow_state")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    source = Column(String)
    doc_metadata = Column(JSON)  # Renamed from metadata to doc_metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    reports = relationship("Report", back_populates="document")

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    content = Column(Text)
    generated_at = Column(DateTime, default=datetime.utcnow)
    report_metadata = Column(JSON)  # Also renamed for consistency
    document = relationship("Document", back_populates="reports")

# Create all tables in the database
Base.metadata.create_all(bind=engine)
