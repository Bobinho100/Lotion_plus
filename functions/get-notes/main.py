import boto3
import json

dynamodb_resource = boto3.resource("dynamodb")

table = dynamodb_resource.Table("lotion-30112955")

def get_item(email):
    return table.query(
        KeyConditionExpression = "email = :email",
        ExpressionAttributeValues = {":email":email},
    )

def handler(event, context):
    email = event["queryStringParameters"]["email"]
    try:

        item = get_item(email)
        return {
            "statusCode": 200,
            "body": json.dumps(item["Items"]),
        }
    except Exception as e:
        print(f"exception: {e}")
        return {
            "statusCode":500,
            "message": "Error getting note",
        }


