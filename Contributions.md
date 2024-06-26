# contributions

## Sprint 1

### Week 1 (24/04/10~24/04/17)

Ziqi Yang

 1.implement register page in front-end(#2)

  * write register page ui and write suitable API to post back username, password and registration code(optinal).
  * implement router of register page

 2.implement lobby page in front-end(#7)
 
  * write lobby page ui and write suitable function of this page which is navigating to two main topics Mensa and Course.
  * implement router of lobby page


 Zheyuan Fu

 1.implement login page in front-end(#3)

  * write login page ui and write suitable API to put back username, password and let back-end to confirm them.
  * implement router of login page

 2.implement header in front-end(#7)
 
  * write header ui and write suitable function of this module which is navigating to lobby page, search page and profile page.
  * paint search icon and profile icon for header

 3.implement createitem page in front-end(#5)
 
  * write createitem page ui and write suitable API to post back topicId and let back-end to create new item under the topic.
  * implement router of createitem page


### week 2 (24/04/17~24/04/24)

Ziqi Yang

 1.implement createtopic page in front-end(#10)

  * write createtopic page ui and write suitable API to post back topicName and let back-end to create new topic by using the topicName
  * implement router of createtopic page

 2.implement and modify profile page in front-end(#19)
 
  * write profile page ui and write suitable API to get back username and creation date from back end
  * write suitable API to get back followitem List from backend and write a new ui to display it.
  * write suitable API to get back commentlist which includes user's own comment from backend and write a new ui to display it.
  * implement router of profile page
    
 3.modify comment page in front-end(#8)
 
  * modify API of comment page to get back item introduction from back-end.

Zheyuan Fu

 1.implement comment page in front-end(#8)

  * write comment page ui and write suitable API to get back itemName, itemIntroduction.
  * write suitable API to post back commentContent. commentOwnerName, commentOwnerId to back-end.
  * write suitable API to get back commentContent. commentOwnerName, commentOwnerId from back-end and display it in this page.
  * implement router of comment page

 2.implement chatspace in front-end(#8)
 
  * write chatspace ui and write suitable function of this module which is a platform for online user to chat in this space.
  * modify chatspace ui and make it display in a suitable place in comment page.

## Sprint 2

#### Week 1 (24/05/01~24/05/08)

Ziqi Yang

 1.implement search page in front-end(#21)

  * write search page ui and write suitable API to get back itemName, TopicName from back-end by keyword.
  * write a select module to switch the search type from item to topic or from topic to item.
  * implement router of search page

 2.add thumbsup function in comment page in front-end(#11)
 
  * write thumbsup function which can count handle thumbsup request. send thumbup operation to back-end and get back total thumbsup number from back-end
  * write suitable Ui of it.

 Zheyuan Fu

 1.add averagescore function in comment page in front-end(#12)

  * write score function which can get back average score from back-end
  * write suitable Ui of it.

 2.add score(rate) function (#11)
 
  * write score function which can count handle rate request. send score to back-end.
  * write suitable Ui of it.(five stars)

 3.modify commentList function and ui in front-end(#13)
 
  * add reply button and show-all-reply button in commentList
  * modify commentList UI to make comments  be displayed more clearly

#### Week 2 (24/05/09~24/05/16)

Ziqi Yang

 1.modify profile page in front-end(#21)

  * add avatar function to make user can upload function
  * write a suitable API to send back avatar to back-end
  * write a suitable Ui of it.

 2.modify commentList in comment page(#13)
 
  * write suitable ui to display avatar of user.
  * add show-all-reply funciton to display all replies to one comment.
  * write a suitable API to get back all replies to this comment from back-end.


 Zheyuan Fu

 1.modify commentList in comment page(#13)

  * write suitable ui to display all replies
  * write suitable ui to send reply to comment
  * write a suitable API to post back a repliy to this comment to back-end.


 2.add topicList page (#17)
 
  * write topiclist page ui and write suitable API to get back all topics from back-end.
  * add create topic function to let user can create new topic 
  * implement router of topiclist page

#### Week 3 (24/05/16~24/05/24)

Ziqi Yang

 1.modify chatspace function(#20)

  * add websocket API in front-end
  * make websocket API be connected with back-end
  * debug websocket function and make it work fluently

 2.add edit function to profile page(#19)
 
  * add edit button to profile page
  * write suitable API to update user's information of back-end

 3.add administrator function(#22)
 
  * add a new identity "administrator"
  * add ban function, delete function to administrator, which means that administrator can ban someone or delete unsuitable topics and items.
  * administrator can release user from ban lists.

 4. modify ui(#16)

  * modify comment ui
  * modify profile ui

 Zheyuan Fu

 1.modify hotitem fucntion in search page(#21)

  * modify API and make front-end can receive three hottest items from back-end
  * modify hotitem fucntion and make users can navigate to items by click them in hotitem.

 2.add sort function in createitem page (#17)
 
  * write a new select button and make user can choose "sorttype" by switch the button
  * add sort function and make items be sorted by the way in sorttype
  * write suitable API to get different sorted items from back-end.

 2.modify ui(#16)
 
  * write a new ui for login page
  * write a new ui for register page
  * write a new ui for lobby page
  * write a new ui for search page
    

