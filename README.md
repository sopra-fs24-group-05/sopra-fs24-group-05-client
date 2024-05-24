# Sopra 24 - Rank Everything Server - by Group 5

## Project Description

"Rank Everything" is an innovative digital application that empowers users to create and participate in topics for collective ranking. This application allows users to create items within these topics, assign points based on their preferences, and visualize rankings in real-time. It also facilitates rich user interaction through the ability to comment on items and engage with comments via replies and likes, ensuring a vibrant community dialogue around each ranked item.



## Technologies

* database: MySQL & H2
* React
* SpringBoot
* Gradle
* WebSocket
* Google Cloud Service
  * SQL
  * Cloud Translation API



## High-level Component

* #### 1. User (Student/Administrator)

  - **Role**: Users are the primary actors in the system. There are two types of users: students and administrators. Students can create topics, items, and comments, whereas administrators have additional privileges to manage the system.
  - **Correlation**: Users interact with all other components. They create topics and items, post comments, and participate in chat messages.
  - **Main Class**: [User.java](https://github.com/sopra-fs24-group-05/sopra-fs24-group-05-server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs24/entity/User.java)

  #### 2. Topic

  - **Role**: A topic represents a subject or category under which items can be created. It serves as an organizational structure for items.
  - **Correlation**: Topics contain items and are created by users. Each topic can have multiple items associated with it.
  - **Main Class**: [Topic.java](https://github.com/sopra-fs24-group-05/sopra-fs24-group-05-server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs24/entity/Topic.java)

  #### 3. Item (Under Specific Topic)

  - **Role**: Items are individual entities that belong to a specific topic. They represent the content or resource that users interact with and comment on.
  - **Correlation**: Items are linked to topics and can have multiple comments. They are created by users.
  - **Main Class**: [Item.java](https://github.com/sopra-fs24-group-05/sopra-fs24-group-05-server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs24/entity/Item.java)

  #### 4. Comment

  - **Role**: Comments are feedback or reviews left by users on items. Each comment includes a score and content. Users can only comment once per item.
  - **Correlation**: Comments are linked to items and users. They contribute to the average score of an item. A special type of comment, called a reply, does not include a score and does not affect the item's average score.
  - **Main Class**: [Comment.java](https://github.com/sopra-fs24-group-05/sopra-fs24-group-05-server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs24/entity/Comment.java)

  #### 5. ChatMessage

  - **Role**: Chat messages are used to record real-time communication between users in a chat room. This component supports synchronous interactions among users.
  - **Correlation**: Chat messages are created by users and are part of the chat room functionality.
  - **Main Class**: [ChatMessage.java](https://github.com/sopra-fs24-group-05/sopra-fs24-group-05-server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs24/entity/ChatMessage.java)



## Launch & Deployment

### Prerequisites

- A web browser (Chrome, Firefox, Safari, etc.)
- Internet connection
- Java 17
- MySQL Database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sopra-fs24-group-05/sopra-fs24-group-05-server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd rank-everything
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up MySQL database:

    - Install MySQL from [here](https://dev.mysql.com/downloads/installer/)

    - Create a database and user for the project:

      ```sql
      CREATE DATABASE rank_everything;
      CREATE USER 'rank_user'@'localhost' IDENTIFIED BY 'password';
      GRANT ALL PRIVILEGES ON rank_everything.* TO 'rank_user'@'localhost';
      FLUSH PRIVILEGES;
      ```

5. Configure the database connection:

    - Create a `.env` file in the root of the project directory and add the following:

      ```env
      DB_HOST=localhost
      DB_USER=rank_user
      DB_PASSWORD=password
      DB_NAME=rank_everything
      ```

### Running the Application

To start the development server, run:

```bash
npm start
```

Open your web browser and go to `http://localhost:3000` to view the application.

## Building with Gradle

You can use the local Gradle Wrapper to build the application.

- macOS: `./gradlew`
- Linux: `./gradlew`
- Windows: `./gradlew.bat`

### Build

```
./gradlew build
```

### Run

```
./gradlew bootRun
```

You can verify that the server is running by visiting `localhost:8080` in your browser.

### Test

```
./gradlew test
```

### Development Mode

You can start the backend in development mode, this will automatically trigger a new build and reload the application once the content of a file has been changed.

Start two terminal windows and run

```
./gradlew build --continuous
```

and in the other one:

```
./gradlew bootRun
```

If you want to avoid running all tests with every change, use the following command instead:

```
./gradlew build --continuous -xtest
```

## Illustrations

### User Registration

The user registration process involves creating an account by providing a username, name, and password. This allows users to access the full features of the application. Below is a screenshot of the registration page.

![image-20240524225728042](.\screenshot\image-20240524225728042.png)

*Figure 1: User Registration Page*



### Lobby Page

After logging in, users will be direct to lobby page below, where they can choose to browse different topics/ 

![image-20240524210027397](.\screenshot\image-20240524210027397.png)

*Figure 2: User Registration Page*

### Topic Creation

Users can create new topics where items can be added and ranked. The topic creation page allows users to specify the topic title, description, and settings regarding who can contribute to the topic. Below is a screenshot of the topic creation page.

![image-20240524210104735](.\screenshot\image-20240524210104735.png)

*Figure 3: Topic Creation Page*

### Item Ranking

Within a topic, users can add items and assign scores to these items based on their preferences. The ranking system aggregates these scores to display a real-time ranking of items. Below is a screenshot of the item ranking interface.

![image-20240524210206671](.\screenshot\image-20240524210206671.png)

*Figure 4: Item Ranking Interface*



### Commenting System

Users can engage in discussions by commenting on items within a topic. They can also reply to comments and like them, enhancing interaction and community engagement. Below is a screenshot of the commenting system.

![image-20240524214023247](C:\Users\23625\AppData\Roaming\Typora\typora-user-images\image-20240524214023247.png)*Figure 5: Commenting System Interface*

## Roadmap

1. **Advanced Filtering**: Implement more advanced filtering options for topics and items.
2. **Enhanced Analytics**: Provide users with detailed analytics and insights on their participation and rankings.
3. **Markdown Files support:** Allow for more detailed and vivid descriptions of topics and items
4. **Gamification**: Implement gamification elements such as badges, leaderboards, and rewards to increase user engagement and interaction.

## Authors and Acknowledgment

- **Yiming Xiao**
- **Zizhou Luo**
- **Ziqi Yang**
- **Zheyuan Fu**

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/sopra-fs24-group-05/sopra-fs24-group-05-server/blob/main/LICENSE) file for details.

## Acknowledgments

- Sopra TA: Louis Caerts
- Hat tip to anyone whose code was used
- Inspiration 
- Solution for WebSocket connection problems from Krumm Jonas and Andermatt Marion Belinda in Sopra forum on OLAT. 