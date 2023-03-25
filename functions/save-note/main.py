# add your save-note function here

import boto3
import json

dynamob_resource = boto3.resource("dynamodb")

table = dynamob_resource.Table("lotion-30112955")


'''def put_item(note):
    table.put_item(
        Item = note
    )
    return*'''


def handler(event, context):

    

    body = json.loads(event['body'])
    try:
        table.put_item(Item = body)
        return{
            'statusCode':200,
            "body" : json.dumps({
            "message": "Note added successfully"
            }
            )
        }
    except Exception as e :
        print(f'exception:{e}')
        return{
            'statusCode':500,
            "body": json.dumps({
            "message": str(e)
            })
        }

