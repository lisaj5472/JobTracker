from datetime import datetime

def validate_resume(data):
    if not data.get("name"):
        return False, "Resume name is required."

    resume = {
        "name": data.get("name"),
        "fileUrl": data.get("fileUrl", ""),  # Local path or S3 URL
        "content": data.get("content", ""),  # Optional: in-browser text content
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
        # "userId": data.get("userId")  # For authentication, when added
        # "isEditable": data.get("isEditable", True)
        # "type": data.get("type", "base")  # to categorize resumes
    }

    return True, resume
