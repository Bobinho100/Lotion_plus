import boto3
import json


dynamob_resource = boto3.resource("dynamodb")

table = dynamob_resource.Table("lotion-30112955")


def delete_item(email, note_id):

    






    return table.delete_item(
        Key = {
        "e-mail":email,
        "id": note_id
        }

    )
def handler(event, context):
    body = json.loads(event["body"])
    note_id = body["id"]
    email = body["e-mail"]


    try:
        delete_item(email, note_id)
        return{
            "satusCode": 200,
            "message": "Note deleted successfully",
        }
    except Exception as e:
        print(f"exception: {e}")
        return {
            "statusCode":500,
            "message": "Error deleting note"
        }