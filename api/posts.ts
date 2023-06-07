export interface Post {
    id: number;
    title: string;
    text: string;
    date: string;
    likes: number;
    comments: Comment[]
}

export interface Comment {
    id: number;
    postId: number;
    text: string;
    date: string;
}

export const posts: Post[] = [
    {
      id: 1,
      title: 'Post 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2022-01-01',
      likes: 5,
      comments: [
        {
          id: 1,
          postId: 1,
          text: 'Comentário 1',
          date: '2022-01-02'
        },
        {
          id: 2,
          postId: 1,
          text: 'Comentário 2',
          date: '2022-01-03'
        },
        {
          id: 3,
          postId: 1,
          text: 'Comentário 3',
          date: '2022-01-04'
        }
      ]
    },
    { id: 2, title: 'Post 2', text: 'Pellentesque auctor, ligula a rutrum eleifend, lectus nunc suscipit metus, ut finibus nisl lacus id justo.', date: '2022-02-15', likes: 3 ,
    comments: [
      {
        id: 1,
        postId: 1,
        text: 'Comentário 1',
        date: '2022-01-02'
      },
      {
        id: 2,
        postId: 1,
        text: 'Comentário 2',
        date: '2022-01-03'
      },
      {
        id: 3,
        postId: 1,
        text: 'Comentário 3',
        date: '2022-01-04'
      }
    ]
  },
    { id: 3, title: 'Post 3', text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras a gravida elit.', date: '2022-04-10', likes: 10,
    comments: [
      {
        id: 1,
        postId: 1,
        text: 'Comentário 1',
        date: '2022-01-02'
      },
      {
        id: 2,
        postId: 1,
        text: 'Comentário 2',
        date: '2022-01-03'
      },
      {
        id: 3,
        postId: 1,
        text: 'Comentário 3',
        date: '2022-01-04'
      }
    ]
  },
    { id: 4, title: 'Post 4', text: 'Integer a consectetur nisi, at tempor mauris. Aliquam erat volutpat.', date: '2022-06-20', likes: 2,
    comments: [
      {
        id: 1,
        postId: 1,
        text: 'Comentário 1',
        date: '2022-01-02'
      },
      {
        id: 2,
        postId: 1,
        text: 'Comentário 2',
        date: '2022-01-03'
      },
      {
        id: 3,
        postId: 1,
        text: 'Comentário 3',
        date: '2022-01-04'
      }
    ] },
    { id: 5, title: 'Post 5', text: 'Quisque nec dapibus metus. Aliquam pulvinar risus vitae dui finibus, at commodo erat fermentum.', date: '2022-08-05', likes: 8,
    comments: [
      {
        id: 1,
        postId: 1,
        text: 'Comentário 1',
        date: '2022-01-02'
      },
      {
        id: 2,
        postId: 1,
        text: 'Comentário 2',
        date: '2022-01-03'
      },
      {
        id: 3,
        postId: 1,
        text: 'Comentário 3',
        date: '2022-01-04'
      }
    ] },
    { id: 6, title: 'Post 6', text: 'Nulla facilisi. Duis condimentum venenatis diam, sit amet interdum leo eleifend vitae.', date: '2022-10-15', likes: 1 ,
    comments: [
      {
        id: 1,
        postId: 1,
        text: 'Comentário 1',
        date: '2022-01-02'
      },
      {
        id: 2,
        postId: 1,
        text: 'Comentário 2',
        date: '2022-01-03'
      }
    ]},
    { id: 7, title: 'Post 7', text: 'Sed commodo gravida aliquam. Cras pharetra, sem in dignissim dignissim, purus urna vulputate risus, a congue quam felis in purus.', date: '2022-12-25', likes: 7,
    comments: [
      {
        id: 1,
        postId: 1,
        text: 'Comentário 1',
        date: '2022-01-02'
      }
    ] },
    { id: 8, title: 'Post 8', text: 'Morbi fringilla enim vitae odio fermentum, ac dignissim nisi rutrum. Mauris euismod felis a nunc rutrum, id luctus lacus iaculis.', date: '2023-02-10', likes: 4, comments: [] },
    { id: 9, title: 'Post 9', text: 'Etiam bibendum velit ligula, id maximus purus molestie nec. Sed auctor tortor vitae nisl dictum rhoncus.', date: '2023-04-01', likes: 6, comments: [] },

];