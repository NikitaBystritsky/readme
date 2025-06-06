export interface Comment {
  id?: string;
  content: string;
  userId: string;
  publicationId: string;
  createdAt?: Date;
}
