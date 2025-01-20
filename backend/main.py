from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, Base, User, Query, WorkflowState, engine

app = FastAPI()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}

@app.get("/test-db")
async def test_db(db: Session = Depends(get_db)):
    try:
        # Test query to verify database connection
        test_user = User(email="test@example.com")
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        
        # Create a test query
        test_query = Query(
            user_id=test_user.id,
            query_text="Test research query"
        )
        db.add(test_query)
        db.commit()
        
        # Create a workflow state
        test_workflow = WorkflowState(
            query_id=test_query.id,
            status="completed",
            current_step="testing"
        )
        db.add(test_workflow)
        db.commit()

        return {
            "message": "Database connection successful",
            "test_data": {
                "user_id": test_user.id,
                "query_id": test_query.id,
                "workflow_id": test_workflow.id
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# Clean up test data
@app.delete("/test-db")
async def cleanup_test_data(db: Session = Depends(get_db)):
    try:
        db.query(WorkflowState).delete()
        db.query(Query).delete()
        db.query(User).delete()
        db.commit()
        return {"message": "Test data cleaned up successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cleanup error: {str(e)}")
