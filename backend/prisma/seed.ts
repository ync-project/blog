import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

// creating solo posts
let numsData = 20
let postData: Prisma.PostCreateInput[] = []
for (let i = 0; i < numsData; i++) {
  postData[i] = 
  {
    title: faker.random.words(),
    content: faker.lorem.lines(),
    author: {
      connectOrCreate: {
        create: {
          name: faker.name.findName(),
          email: faker.internet.email(),
        },
        where:{
          email: faker.internet.email(),
        }
      }  
    }    
  }
}  

// creating multiple posts (one author multiple posts)
numsData = 3
let mpostData: Prisma.PostCreateInput[] = []
let cnt = 0
for (let i = 0; i < numsData; i++) {
  const name = faker.name.findName()
  const email = faker.internet.email()
  const nPosts = faker.datatype.number({ min: 2, max: 5, precision: 1 })
  for (let j = 0; j < nPosts; j++) {
    mpostData[cnt++] = {
      title: faker.random.words(),
      content: faker.lorem.lines(),
      author: {
        connectOrCreate: {
          create: {
            name,
            email,
          },
          where:{
            email,
          }
        }  
      }    
      }
  }  
}  
async function main() {
  console.log(`Start seeding ...`)
  for (const d of postData) {
    const post = await prisma.post.create({
      data: d,
    })
    console.log(`Created solo author post with id: ${post.id}`)
  }
  for (const d of mpostData) {
    const post = await prisma.post.create({
      data: d,
    })
    console.log(`Created same author posts with id: ${post.id, post.authorId}`)
  }
  //console.log('mpostData', JSON.stringify(mpostData))
  console.dir(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
