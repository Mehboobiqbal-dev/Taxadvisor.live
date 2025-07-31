import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    blogs(
      limit: Int = 10
      offset: Int = 0
      sortBy: String = "createdAt"
      sortOrder: String = "DESC"
      category: String
      search: String
    ): BlogConnection!
    blog(id: ID!): Blog
    comments(blogId: ID!, limit: Int = 20, offset: Int = 0): CommentConnection!
    news(limit: Int = 10, offset: Int = 0): NewsConnection!
  }

  type Mutation {
    createBlog(input: CreateBlogInput!): Blog!
    updateBlog(id: ID!, input: UpdateBlogInput!): Blog!
    deleteBlog(id: ID!): Boolean!
    createComment(input: CreateCommentInput!): Comment!
    deleteComment(id: ID!): Boolean!
  }

  type Subscription {
    blogAdded: Blog!
    commentAdded(blogId: ID!): Comment!
    newsAdded: News!
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    excerpt: String
    slug: String!
    author: String!
    category: String!
    tags: [String!]!
    featuredImage: String
    published: Boolean!
    createdAt: String!
    updatedAt: String!
    comments: [Comment!]!
    viewCount: Int!
    readTime: Int
  }

  type Comment {
    id: ID!
    content: String!
    author: String!
    email: String!
    blogId: ID!
    approved: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type News {
    id: ID!
    title: String!
    content: String!
    source: String!
    url: String
    publishedAt: String!
    createdAt: String!
    category: String!
  }

  type BlogConnection {
    edges: [BlogEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type BlogEdge {
    node: Blog!
    cursor: String!
  }

  type CommentConnection {
    edges: [CommentEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type CommentEdge {
    node: Comment!
    cursor: String!
  }

  type NewsConnection {
    edges: [NewsEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type NewsEdge {
    node: News!
    cursor: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  input CreateBlogInput {
    title: String!
    content: String!
    excerpt: String
    slug: String!
    author: String!
    category: String!
    tags: [String!]!
    featuredImage: String
    published: Boolean = false
  }

  input UpdateBlogInput {
    title: String
    content: String
    excerpt: String
    category: String
    tags: [String!]
    featuredImage: String
    published: Boolean
  }

  input CreateCommentInput {
    content: String!
    author: String!
    email: String!
    blogId: ID!
  }
`;
