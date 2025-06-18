import { v4 as randomUUID } from 'uuid';

import { PrismaClient, PostStatus, PostType } from '@prisma/client';

const uuids = new Map<string, string>();
const userIds = ['507f191e810c19729de860ea', '507f1f77bcf86cd799439011'];

function setRandomUUID(prefix: string, count: number): void {
  for (let i = 0; i < count; i++) {
    uuids.set(`${prefix}${i}`, randomUUID());
  }
}

function getTags() {
  setRandomUUID('tag', 6);

  return [
    {
      tagId: uuids.get('tag0'),
      tags: ['#походвгоры', '#заповедник', '#вода', '#горы', '#облака', '#бурабай']
    },
    {
      tagId: uuids.get('tag1'),
      tags: ['#живопись','#творчество', '#пейзаж', '#лес']
    },
    {
      tagId: uuids.get('tag2'),
      tags: ['#кот', '#кошки', '#кошка', '#длядетей', '#котята']
    },
    {
      tagId: uuids.get('tag3'),
      tags: ['#библиотека', '#книги', '#кошка', '#рамкафото', '#перо', '#чернила', '#фэнтези', '#кубок']
    },
    {
      tagId: uuids.get('tag4'),
      tags: ['#город', '#восход', '#Япония', '#Токио']
    },
    {
      tagId: uuids.get('tag5'),
      tags: ['#природа', '#алтай', '#небо', '#заповедник', '#горы']
    }
  ]
}

function getLinks() {
  setRandomUUID('link', 3);

  return [
    {
      linkId: uuids.get('link0'),
      url: 'https://nestjs.com/',
      description: 'Прогрессивный фреймворк для создания эффективных, надежных и масштабируемых серверных приложений.'
    },
    {
      linkId: uuids.get('link1'),
      url: 'https://www.postgresql.org/',
      description: 'Самая совершенная в мире реляционная база данных с открытым исходным кодом'
    },
    {
      linkId: uuids.get('link2'),
      url: 'https://www.mongodb.com/',
      description: 'Документоориентированная система управления базами данных, не требующая описания схемы таблиц'
    }
  ]
}

function getPhotos() {
  setRandomUUID('photo', 3);

  return [
    {
      photoId: uuids.get('photo0'),
      image: 'cat.jpg'
    },
    {
      photoId: uuids.get('photo1'),
      image: 'library.png'
    },
    {
      photoId: uuids.get('photo2'),
      image: 'forest.jpg'
    }
  ]
}

function getQuotes() {
  setRandomUUID('quote', 3);

  return [
    {
      quoteId: uuids.get('quote0'),
      author: 'Альберт Эйнштейн',
      content: 'Жизнь похожа на езду на велосипеде. Чтобы сохранить равновесие, ты должен продолжать двигаться.'
    },
    {
      quoteId: uuids.get('quote1'),
      author: 'Фёдор Достоевский',
      content: 'Надо любить жизнь больше, чем сам смысл жизни!'
    },
    {
      quoteId: uuids.get('quote2'),
      author: 'Форрест Гамп (1994)',
      content: 'Жизнь похожа на коробку шоколадных конфет; никогда не знаешь, что получишь'
    }
  ]
}

function getTexts() {
  setRandomUUID('text', 3);

  return [
    {
      textId: uuids.get('text0'),
      title: 'Искусственный интеллект все же лишает людей работы',
      preview: 'Научный журнал применил ИИ для создания научных статей.',
      content: `Пару недель назад австралийский научный журнал Cosmos стал гораздо известнее, чем раньше.
        Но не потому, что он опубликовал какую-то прорывную статью.
        Все дело из-за применения генеративного искусственного интеллекта (ИИ) для создания научных статей.
        Эксперимент, на который пошел журнал, вызвал критику и негодование не только со стороны научного сообщества и читателей, но и бывших авторов издания, редакторов и двух учредителей.`
    },
    {
      textId: uuids.get('text1'),
      title: 'Как максимально быстро раскрутить канал на Youtube',
      preview: 'Автор одного из самых прибыльных YouTube-блогов, эксперт по созданию и развитию YouTube каналов делится своим опытом.',
      content: `Многие начинающие ютуб-блогеры не имеют толкового плана развития своих каналов, а потому с удовольствием обратятся за помощью к специалисту.
        И с тем же удовольствием, подарят вам желаемый трафик.`
    },
    {
      textId: uuids.get('text2'),
      title: 'Музыка и память',
      preview: 'Новое открытие музыкальной терапии при таких состояниях, как ПТСР, депрессия и деменция.',
      content: `Два новых исследования предлагают простой вывод.
        Музыка способна улучшить усвоение новой информации и позитивно влиять на существующие воспоминания.
        Открытие создает условия для разработки методологии для музыкальной терапии при таких состояниях, как ПТСР, депрессия и деменция.`
    }
  ]
}

function getVideos() {
  setRandomUUID('video', 3);

  return [
    {
      videoId: uuids.get('video0'),
      title: 'Бурабай Казахстан',
      url: 'https://www.youtube.com/watch?v=xBInF48M0F0'
    },
    {
      videoId: uuids.get('video1'),
      title: 'Восход солнца в Токио',
      url: 'https://www.youtube.com/watch?v=6Nlfqu_63Mk'
    },
    {
      videoId: uuids.get('video2'),
      title: 'Горный Алтай',
      url: 'https://www.youtube.com/watch?v=DZdUS9cDovQ'
    }
  ]
}

function getPublications() {
  setRandomUUID('publication', 6);

  return [
    {
      publicationId: uuids.get('publication0'),
      type: 'photo',
      status: 'published',
      repost: false,
      userId:  userIds[0],
      photoId: uuids.get('photo0'),
      tagId: uuids.get('tag2')
    },
    {
      publicationId: uuids.get('publication1'),
      type: 'link',
      status: 'published',
      repost: false,
      userId:  userIds[1],
      linkId: uuids.get('link0')
    },
    {
      publicationId: uuids.get('publication2'),
      type: 'quote',
      status: 'published',
      repost: false,
      userId:  userIds[0],
      quoteId: uuids.get('quote0')
    },
    {
      publicationId: uuids.get('publication3'),
      type: 'text',
      status: 'published',
      repost: false,
      userId:  userIds[1],
      textId: uuids.get('text0')
    },
    {
      publicationId: uuids.get('publication4'),
      type: 'video',
      status: 'draft',
      repost: false,
      userId:  userIds[1],
      videoId: uuids.get('video0'),
      tagId: uuids.get('tag5'),
    },
    {
      publicationId: uuids.get('publication5'),
      type: 'video',
      status: 'draft',
      repost: true,
      userId:  userIds[0],
      videoId: uuids.get('video0'),
      originalUserId: userIds[1],
      originalPublicationId: uuids.get('publication4'),
      tagId: uuids.get('tag5'),
    }
  ]
}

function getComments() {
  setRandomUUID('comment', 3);

  return [
    {
      commentId: uuids.get('comment0'),
      content: `ИИ, который обучили на старых журналах, наверняка будет выдавать устаревшие сведения.
      Без вычитывания экспертом будет школьное сочинение, а не научная статья.`,
      publicationId: uuids.get('publication3'),
      userId: userIds[0]
    },
    {
      commentId: uuids.get('comment1'),
      content: 'Позитивные котята',
      publicationId: uuids.get('publication0'),
      userId: userIds[1]
    },
    {
      commentId: uuids.get('comment2'),
      content: 'Красивый вид на озеро и горы)',
      publicationId: uuids.get('publication4'),
      userId: userIds[0]
    }
  ]
}

function getLikes() {
  setRandomUUID('like', 3);

  return [
    {
      likeId: uuids.get('like0'),
      publicationId: uuids.get('publication2'),
      userId: userIds[1],
    },
    {
      likeId: uuids.get('like1'),
      publicationId: uuids.get('publication2'),
      userId: userIds[0],
    },
    {
      likeId: uuids.get('like2'),
      publicationId: uuids.get('publication4'),
      userId: userIds[1],
    }
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const tags = getTags();

  for(const tag of tags) {
    await prismaClient.tag.create({
      data: {
        id: tag.tagId,
        tags: tag.tags
      }
    })
  }

  const links = getLinks();

  for(const link of links) {
    await prismaClient.link.create({
      data: {
        id: link.linkId,
        url: link.url,
        description: link.description
      }
    })
  }

  const photos = getPhotos();

  for(const photo of photos) {
    await prismaClient.photo.create({
      data: {
        id: photo.photoId,
        image: photo.image
      }
    })
  }

  const quotes = getQuotes();

  for(const quote of quotes) {
    await prismaClient.quote.create({
      data: {
        id: quote.quoteId,
        author: quote.author,
        content: quote.content
      }
    })
  }

  const texts = getTexts();

  for(const text of texts) {
    await prismaClient.text.create({
      data: {
        id: text.textId,
        title: text.title,
        preview: text.preview,
        content: text.content
      }
    })
  }

  const videos = getVideos();

  for(const video of videos) {
    await prismaClient.video.create({
      data: {
        id: video.videoId,
        title: video.title,
        url: video.url
      }
    })
  }

  const publications = getPublications();

  for(const publication of publications) {
    await prismaClient.publication.create({
      data: {
        id: publication.publicationId,
        type: publication.type.toUpperCase() as PostType,
        status: publication.status.toUpperCase() as PostStatus,
        repost: publication.repost,
        userId: publication.userId,
        [`${publication.type}Id`]: publication[`${publication.type}Id`],
        originalUserId: publication.originalUserId,
        originalPublicationId: publication.originalPublicationId,
        tagId: publication.tagId
      }
    })
  }

  const comments = getComments();

  for(const comment of comments) {
    await prismaClient.comment.create({
      data: {
        id: comment.commentId,
        content: comment.content,
        publicationId: comment.publicationId as string,
        userId: comment.userId
      }
    })
  }

  const likes = getLikes();

  for(const like of likes) {
    await prismaClient.like.create({
      data: {
        id: like.likeId,
        publicationId: like.publicationId  as string,
        userId: like.userId
      }
    })
  }
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    prismaClient.$connect();
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
