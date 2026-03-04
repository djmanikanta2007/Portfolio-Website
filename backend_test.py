#!/usr/bin/env python3
"""
Backend API Testing for DJ Manikanta Portfolio
Tests all backend APIs using the production URL
"""

import requests
import json
from datetime import datetime
import uuid
import sys

# Base URL from frontend .env
BASE_URL = "https://manikanta-motion.preview.emergentagent.com/api"

def print_test_result(test_name, passed, details=""):
    """Print formatted test results"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} {test_name}")
    if details:
        print(f"   Details: {details}")
    print()

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing Health Check (GET /api/)")
    try:
        response = requests.get(f"{BASE_URL}/")
        
        if response.status_code == 200:
            data = response.json()
            expected = {"message": "Hello World"}
            if data == expected:
                print_test_result("Health Check", True, f"Correct response: {data}")
                return True
            else:
                print_test_result("Health Check", False, f"Expected {expected}, got {data}")
                return False
        else:
            print_test_result("Health Check", False, f"Status code: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print_test_result("Health Check", False, f"Exception: {str(e)}")
        return False

def test_contact_form_submission():
    """Test valid contact form submission"""
    print("🔍 Testing Contact Form Submission (POST /api/contact)")
    
    test_data = {
        "name": "Test Client",
        "email": "testclient@example.com",
        "projectType": "Video Editing",
        "message": "I need a professional video edit for my YouTube channel. Looking for cinematic color grading and smooth transitions."
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact",
            headers={"Content-Type": "application/json"},
            json=test_data
        )
        
        if response.status_code == 200:
            data = response.json()
            expected_keys = ["success", "message", "id"]
            
            if all(key in data for key in expected_keys):
                if (data["success"] == True and 
                    "Contact submission received!" in data["message"] and 
                    data["id"]):
                    print_test_result("Contact Form Submission", True, f"Response: {data}")
                    return True, data["id"]
                else:
                    print_test_result("Contact Form Submission", False, f"Invalid response structure: {data}")
                    return False, None
            else:
                print_test_result("Contact Form Submission", False, f"Missing keys in response: {data}")
                return False, None
        else:
            print_test_result("Contact Form Submission", False, f"Status code: {response.status_code}, Response: {response.text}")
            return False, None
    except Exception as e:
        print_test_result("Contact Form Submission", False, f"Exception: {str(e)}")
        return False, None

def test_get_contact_submissions(expected_submission_id=None):
    """Test retrieving contact submissions"""
    print("🔍 Testing Get Contact Submissions (GET /api/contact)")
    
    try:
        response = requests.get(f"{BASE_URL}/contact")
        
        if response.status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                if expected_submission_id:
                    # Check if our submission is there
                    found_submission = False
                    for submission in data:
                        if submission.get("id") == expected_submission_id:
                            found_submission = True
                            # Check required fields
                            required_fields = ["name", "email", "projectType", "message", "submittedAt", "status"]
                            if all(field in submission for field in required_fields):
                                print_test_result("Get Contact Submissions", True, f"Found {len(data)} submissions, including our test submission")
                                return True
                            else:
                                missing_fields = [f for f in required_fields if f not in submission]
                                print_test_result("Get Contact Submissions", False, f"Missing fields in submission: {missing_fields}")
                                return False
                    
                    if not found_submission:
                        print_test_result("Get Contact Submissions", False, f"Test submission with ID {expected_submission_id} not found")
                        return False
                else:
                    print_test_result("Get Contact Submissions", True, f"Retrieved {len(data)} submissions")
                    return True
            else:
                print_test_result("Get Contact Submissions", False, f"Expected list, got {type(data)}")
                return False
        else:
            print_test_result("Get Contact Submissions", False, f"Status code: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print_test_result("Get Contact Submissions", False, f"Exception: {str(e)}")
        return False

def test_invalid_email_validation():
    """Test email validation with invalid email"""
    print("🔍 Testing Invalid Email Validation (POST /api/contact)")
    
    test_data = {
        "name": "Test",
        "email": "invalid-email",
        "projectType": "Video",
        "message": "Test"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact",
            headers={"Content-Type": "application/json"},
            json=test_data
        )
        
        if response.status_code == 422:
            print_test_result("Invalid Email Validation", True, f"Correctly rejected invalid email with 422 status")
            return True
        else:
            print_test_result("Invalid Email Validation", False, f"Expected 422 status code, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Invalid Email Validation", False, f"Exception: {str(e)}")
        return False

def test_multiple_contact_submissions():
    """Test submitting multiple contact forms"""
    print("🔍 Testing Multiple Contact Submissions")
    
    test_submissions = [
        {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@email.com",
            "projectType": "Music Production",
            "message": "Looking for professional mixing and mastering for my upcoming EP."
        },
        {
            "name": "Mike Rodriguez",
            "email": "mike.rodriguez@company.com",
            "projectType": "Event DJ",
            "message": "Need a DJ for corporate event on December 15th. 200+ attendees."
        },
        {
            "name": "Lisa Chen",
            "email": "lisa.chen@startup.io",
            "projectType": "Video Editing",
            "message": "Need promotional video editing for our new product launch campaign."
        }
    ]
    
    submission_ids = []
    all_successful = True
    
    for i, submission in enumerate(test_submissions, 1):
        try:
            response = requests.post(
                f"{BASE_URL}/contact",
                headers={"Content-Type": "application/json"},
                json=submission
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("id"):
                    submission_ids.append(data["id"])
                    print(f"   ✅ Submission {i} successful: {submission['name']}")
                else:
                    print(f"   ❌ Submission {i} failed: Invalid response structure")
                    all_successful = False
            else:
                print(f"   ❌ Submission {i} failed: Status {response.status_code}")
                all_successful = False
        except Exception as e:
            print(f"   ❌ Submission {i} failed: {str(e)}")
            all_successful = False
    
    print_test_result("Multiple Contact Submissions", all_successful, f"Successfully submitted {len(submission_ids)} out of {len(test_submissions)} forms")
    return all_successful, submission_ids

def verify_timestamps_format():
    """Verify that timestamps are in correct format"""
    print("🔍 Testing Timestamp Format")
    
    try:
        response = requests.get(f"{BASE_URL}/contact")
        
        if response.status_code == 200:
            data = response.json()
            
            if isinstance(data, list) and len(data) > 0:
                for submission in data:
                    if "submittedAt" in submission:
                        timestamp_str = submission["submittedAt"]
                        try:
                            # Try to parse the timestamp
                            parsed_time = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
                            print_test_result("Timestamp Format", True, f"Timestamps are in correct ISO format")
                            return True
                        except ValueError:
                            print_test_result("Timestamp Format", False, f"Invalid timestamp format: {timestamp_str}")
                            return False
                
                print_test_result("Timestamp Format", False, "No timestamps found in submissions")
                return False
            else:
                print_test_result("Timestamp Format", False, "No submissions found to check timestamps")
                return False
        else:
            print_test_result("Timestamp Format", False, f"Failed to get submissions: {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Timestamp Format", False, f"Exception: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 Starting DJ Manikanta Portfolio Backend API Tests")
    print(f"Base URL: {BASE_URL}")
    print("=" * 60)
    
    test_results = []
    
    # Test 1: Health Check
    test_results.append(("Health Check", test_health_check()))
    
    # Test 2: Contact Form Submission
    contact_success, submission_id = test_contact_form_submission()
    test_results.append(("Contact Form Submission", contact_success))
    
    # Test 3: Get Contact Submissions
    get_success = test_get_contact_submissions(submission_id if contact_success else None)
    test_results.append(("Get Contact Submissions", get_success))
    
    # Test 4: Invalid Email Validation
    test_results.append(("Invalid Email Validation", test_invalid_email_validation()))
    
    # Test 5: Multiple Contact Submissions
    multiple_success, multiple_ids = test_multiple_contact_submissions()
    test_results.append(("Multiple Contact Submissions", multiple_success))
    
    # Test 6: Timestamp Format Verification
    test_results.append(("Timestamp Format", verify_timestamps_format()))
    
    # Summary
    print("=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed_tests = 0
    total_tests = len(test_results)
    
    for test_name, passed in test_results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status} {test_name}")
        if passed:
            passed_tests += 1
    
    print(f"\nResults: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All backend tests PASSED!")
        return True
    else:
        print(f"⚠️  {total_tests - passed_tests} tests FAILED!")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)