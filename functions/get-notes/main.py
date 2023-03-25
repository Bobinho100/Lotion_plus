import boto3
import json
from boto3.dynamodb.conditions import Key

dynamodb_resource = boto3.resource("dynamodb")

table = dynamodb_resource.Table("lotion-30112955")



def handler(event, context):


    
    
    email = event["queryStringParameters"]["e-mail"]
    try:
        res = table.query(KeyConditionExpression = Key("e-mail").eq(email))

        return{
            "statusCode":200,
            "body": json.dumps(res["Items"])
        }
    except Exception as e:
        print(f"exception: {e}")
        return {
            "statusCode":500,
            "body": json.dumps({
            "message": str(e)
            })
            
        }


