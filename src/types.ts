export type User = {
  username: string;
  // name: string;
  userId: number;
};
export type Topic = {
  topicname: string;
  topicIntroduction: string;
  topicId: number;
};
export type Item = {
  itemname: string;
  itemIntroduction: string;
  itemId: number;
  itemTopicId: number;

};
export type Comment = {
  comment: string;
  commentOwnerId: number;
  commentId: number;
  commentitemId:number;
  commentRate:number;
  commentThumbups:number;
};