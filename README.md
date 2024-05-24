# Sopra 24 - Rank Everything Server - by Group 5

## Project Description

"Rank Everything" is an innovative digital application that empowers users to create and participate in topics for collective ranking. This application allows users to create items within these topics, assign points based on their preferences, and visualize rankings in real-time. It also facilitates rich user interaction through the ability to comment on items and engage with comments via replies and likes, ensuring a vibrant community dialogue around each ranked item.

## Getting Started

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

需要补图

*Figure 1: User Registration Page*



### Topic Creation

Users can create new topics where items can be added and ranked. The topic creation page allows users to specify the topic title, description, and settings regarding who can contribute to the topic. Below is a screenshot of the topic creation page.

需要补图

*Figure 2: Topic Creation Page*



### Item Ranking

Within a topic, users can add items and assign scores to these items based on their preferences. The ranking system aggregates these scores to display a real-time ranking of items. Below is a screenshot of the item ranking interface.

需要补图

*Figure 3: Item Ranking Interface*



### Commenting System

Users can engage in discussions by commenting on items within a topic. They can also reply to comments and like them, enhancing interaction and community engagement. Below is a screenshot of the commenting system.

需要补图

*Figure 4: Commenting System Interface*

## Roadmap

1. **Advanced Filtering**: Implement more advanced filtering options for topics and items.
2. **Enhanced Analytics**: Provide users with detailed analytics and insights on their participation and rankings.
3. **Gamification**: Implement gamification elements such as badges, leaderboards, and rewards to increase user engagement and interaction.

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
- etc