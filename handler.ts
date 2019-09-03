import { APIGatewayProxyHandler } from 'aws-lambda';
import { EC2 } from 'aws-sdk';

const ec2Client = () => {
  return new EC2({ apiVersion: '2016-11-15' });
};

const instanceIds = () => {
  return ['i-YOUR-INSTANCE-ID'];
};

export const hello: APIGatewayProxyHandler = async event => {
  console.info('Hello');
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event
    })
  };
};

export const start: APIGatewayProxyHandler = async _ => {
  console.info('EC2 Start');
  try {
    const res = await ec2Client()
      .startInstances({ InstanceIds: instanceIds() })
      .promise();
    console.info('res', res);
  } catch (error) {
    console.error('error startInstances: ', error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'EC2 Start finished'
    })
  };
};

export const stop: APIGatewayProxyHandler = async _ => {
  console.info('EC2 Stop');
  try {
    const res = await ec2Client()
      .stopInstances({ InstanceIds: instanceIds() })
      .promise();
    console.info('res', res);
  } catch (error) {
    console.error('error stopInstances: ', error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'EC2 Stop finished'
    })
  };
};
