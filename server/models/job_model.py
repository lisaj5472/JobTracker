def validate_job(data):
    if not data.get("jobTitle"):
        return False, "Job title is required."
    if not data.get("company"):
        return False, "Company is required."
    
    return True, {
        "jobTitle": data.get("jobTitle"),
        "company": data.get("company"),
        "postingLink": data.get("postingLink"),
    }