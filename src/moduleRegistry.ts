import AWS from 'aws-sdk';
import ModuleMetadata from './moduleMetadata';
import { Converter } from 'aws-sdk/clients/dynamodb';

export default class ModuleRegistry {
  private dynamoDb: AWS.DynamoDB;

  constructor() {
    AWS.config.update({ region: 'us-east-1' });
    this.dynamoDb = new AWS.DynamoDB();
  }

  async GetAllModules(): Promise<ModuleMetadata[]> {
    const data = await this.dynamoDb
      .scan({
        TableName: 'VRCFT-Module-Entries',
      })
      .promise();

    return data.Items?.map(
      (item) => Converter.unmarshall(item) as ModuleMetadata,
    );
  }

  async GetAllOwnedModules(ownerId: string): Promise<ModuleMetadata[]> {
    const data = await this.dynamoDb
      .scan({
        FilterExpression: 'OwnerId = :ownerId',
        ExpressionAttributeValues: {
          ':ownerId': { S: ownerId },
        },
        TableName: 'VRCFT-Module-Entries',
      })
      .promise();

    return data.Items?.map(
      (item) => Converter.unmarshall(item) as ModuleMetadata,
    );
  }

  async GetModule(moduleId: string): Promise<ModuleMetadata> {
    const data = await this.dynamoDb
      .getItem({
        TableName: 'VRCFT-Module-Entries',
        Key: {
          ModuleId: { S: moduleId },
        },
      })
      .promise();

    return Converter.unmarshall(data.Item) as ModuleMetadata;
  }

  async UpdateModule(meta: ModuleMetadata): Promise<void> {
    await this.dynamoDb
      .updateItem({
        TableName: 'VRCFT-Module-Entries',
        Key: {
          ModuleId: { S: meta.ModuleId },
        },
        UpdateExpression:
          'SET #version = :version, #downloadUrl = :downloadUrl, #dllName = :dllName',
        ExpressionAttributeNames: {
          '#version': 'Version',
          '#downloadUrl': 'DownloadUrl',
          '#dllName': 'DllFileName',
        },
        ExpressionAttributeValues: {
          ':version': { S: meta.Version },
          ':downloadUrl': { S: meta.DownloadUrl },
          ':dllName': { S: meta.DllFileName },
        },
      })
      .promise();
  }
}
