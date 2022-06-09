# S3 Storage

# Index

1. AWS Storage Service.
2. What is Amazon S3?
3. Buckets & Objects
4. Versioning & Cross Region Replication
5. Transfer Acceleration
6. AWS S3 Demo & Use Case

## AWS Storage Service.

- While we are learning about Storage in AWS It will be many storage Services Like

  - Amazon Elastic Block Store:- it gives you storage in the form of block. each of this block is connected to a perticular system or an instance. In order to access this memory or storage you have to make sure that you have an instance connected to it & we can access it using that instance only(This is one of the limitation).Otherwise its highly scalable & good storage service.

  - Amazon Elastic File System:- it is shared file system hence its not attach to a perticular system & OS.

  - Amazon S3 Glacier :- It help you to store archival data.It means that certatin data we didn't want to retrive day to day life or use on daily basis. it store data in specific duration at that duration you dont have rights to access that data after some duration that you set at that time you are able to access that data.

  - Amazon Storage Gateway:- its a gateway between two different platform. suppose our data lies on premisis architechture and i need to move it into amazon storage service at that this will be used. So in short we can tell that it is middleware to store data.

  - Amazon S3 Storage:- Read what is AWS S3?

  - some more storage services are also available like snowball it measn that you can store data physically it store small amount of data. If we have large amount of data at that time we can also use snowMobil which is moving data center. which work on simiary principal.

## What is Amazon S3?

- Here is the main Topic that we are working on:-

- Now this is simple storage web service interface that you can use to store and retrieve any amount of data at any time from anywhere on the web.

- So this is also called as Storage Service Of The Internet.

### Features:-

1. Highly Durable
2. Highly Flexible
3. Available in different Regions
4. Cost Efficient
5. Free to Use for Developer (1 Year For Free with some limitations)
   - 5GB Storage
   - 20000 Get Request
   - 2000 Put Request
   - It charges on pay as you go model we paid only for the specific time duration that we are using. Only for the capacity that we are using for.
6. Scalable
7. Secure(Encrypt Data & Various Buckets policy that let you decide who get access to your data)

## Buckets & Objects

- Now we can learn how the AWS storage works. So, Basically it work on Objects & Buckets.
- Bucket Means A container & Objects means the file we can put on Buckets.

- AWS S3 has three storage classes Standard, Infrequent Access and Glacier.

## Versioning & Cross Region Replication

- you may use versioning to keep multiple versions of an object in one bucket.

- suppose if we are uploading some images at that time this will be used if the image name is same but if we enable the versioning at that time version will also be uploaded into the bucket so same image name have different version so it easy to find same name image. it mostly used in documents.

- It By Default Versioning is Disabled.
- Prevents overwriting or accidental deletion.
- get non concurrent version by specifying version id.

### Cross Region Replication:-

- In s3 we are storing data in bucket and what if we want to move data from one bucket in other region to another bucket in other region.

- Cross-region replication(CRR)enables automatic,asynchronous copying of objects across buckets in different AWS Regions.Buckets configured for cross-region replication can be owned by the same AWS account or by different accounts.

- Cross-region replication(CRR) is help you to do that.
