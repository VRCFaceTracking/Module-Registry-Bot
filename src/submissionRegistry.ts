import AWS from 'aws-sdk';
import { Converter } from 'aws-sdk/clients/dynamodb';
import ModuleSubmission from './moduleSubmission';

export default class SubmissionRegistry {
  private dynamoDb: AWS.DynamoDB;

  constructor() {
    AWS.config.update({ region: 'us-east-1' });
    this.dynamoDb = new AWS.DynamoDB();
  }

  async CreateSubmission(submission: ModuleSubmission): Promise<void> {
    await this.dynamoDb
      .putItem({
        TableName: 'VRCFT-Module-Submissions',
        Item: Converter.marshall(submission),
      })
      .promise();
  }

  async GetSubmission(
    moduleId: string,
    version: string,
  ): Promise<ModuleSubmission> {
    const data = await this.dynamoDb
      .getItem({
        TableName: 'VRCFT-Module-Submissions',
        Key: {
          ModuleId: { S: moduleId },
          Version: { S: version },
        },
      })
      .promise();

    return Converter.unmarshall(data.Item) as ModuleSubmission;
  }

  async DeleteSubmission(moduleId: string, version: string): Promise<void> {
    await this.dynamoDb
      .deleteItem({
        TableName: 'VRCFT-Module-Submissions',
        Key: {
          ModuleId: { S: moduleId },
          Version: { S: version },
        },
      })
      .promise();
  }
}
