# contributions

## Sprint 1

### Week 1 (24/04/10~24/04/17)

* Zizhou Luo

  progress on implementing User Management System(#4,#7,#9): Registration, Login, Logout

  * modify User Class in `User.java`, add several fields, corresponding methods and corresponding mapping in `DTOMapper.java`
  * implement help methods in `UserService.java` to manipulate database and provide corresponding endpoint in `UserController.java`

  create `contributions.md` to keep track of weekly contribution

  add comments to make the code more readable 



### week 2

* Zizhou Luo

  progress on comment and scoring system (#15) and other user related methods

  progress on frontend and backend integration


#### Week 2 (24/04/17~24/04/24)

* Yiming Xiao

    Finish implementing Topic System as per User stories.

    * Related files include `Topic.java`, `TopicController.java`, `TopicService.java`, `TopicRepository.java`, `TopicGetDTO.java`, `TopicPostDTO.java`in the project.

    Finish implementing Item System as per User stories.

    * Related files include `Item.java`, `ItemController.java`, `ItemService.java`, `ItemRepository.java` in the project.

    Modify the function 'Ranking' and 'Get the average score' as per discussion with Zizhou.

    * Delete the function related code in item system and use it from Comment system.

## Sprint 2

#### Week 1 (24/05/01~24/05/08)

* Yiming Xiao

    Finish test all functions in Topic Controller.

    * Related files include `TopicController.java`, `TopicControllerTest.java`in the project.

    Finish test all functions in Item Controller.

    * Related files include  `ItemController.java`, `ItemControllerTest.java` in the project.

    Add Translate funtion and finish testing.

    * Related files include  `TranslateController.java`, `TranslateControllerTest.java` in the project.

    

### Week 2

* Zizhou Luo

  Change database from H2 to MySQL to persist the data

  * Create Google Cloud MySQL instance and test connection
  * modified configuration files `application.properties`&`build.gradle` and relative test `test\repository\*`

  Learning WebSocket 


* Yiming Xiao(24/05/08~24/05/15)

    Finish test all functions in TopicService and TopicRepository.

    * Related files include `TopicService.java`, `TopicServiceTest.java`, `TopicRepository.java`, `TopicRepositoryTest.java`in the project.

    Finish test all functions in ItemService and ItemRepository.

    * Related files include `ItemService.java`, `ItemServiceTest.java`, `ItemRepository.java`, `ItemRepositoryTest.java`in the project.

    Finish test Topic & Item parts in DTOMapper.

    * Related file `DTOMapper.java` in the project.

### Week 3

* Yiming Xiao(24/05/15~24/05/22)

1. **Add function as per Frontend requirement**
    * Search items by keywords: Search for items by keywords so that I can efficiently find items of interest.
    * Get popular item:  Get which is most popular item
    * Get items sorted by Comment Count
    * Related Files:
        - `Item.java`,`ItemService.java`, `ItemController.java`,
        - `ItemTest.java`,`ItemServiceTest.java`,`ItemControllerTest.java`
2. **Refactor DTO Classes:**
    - ItemPostDTO:
        - Removed default value initialization from field declarations and moved them to the constructor.
        - Ensured type consistency and improved code readability.
    - TopicPostDTO:
        - Unified `Integer` and `Long` types for consistency.
        - Streamlined the code for better maintainability.
    - ItemGetDTO:
        - Standardized method names to match field names.
        - Removed unnecessary blank lines and optimized code structure.
    - TopicGetDTO:
        - Consistently used `Integer` and `Long` types.
        - Improved code readability and maintainability.
    - Related Files:
        - `ItemPostDTO.java`,`ItemGetDTO.java`, `TopicPostDTO.java`,`TopicGetDTO.java`,`ItemService.java`,`ItemServiceTest.java`
3. **Add Comprehensive Unit Tests:**
    - ItemPostDTOTest:
        - Added tests for `addLike` and `incrementPopularity` methods.
        - Included tests for all getters and setters to ensure proper functionality.
    - ItemGetDTOTest:
        - Added tests for `addLike` and `incrementPopularity` methods.
        - Included tests for all getters and setters to ensure proper functionality.
    - ItemServiceTest:
        - Added missing tests for `getItemsSortedByPopularity` and `searchItemsByKeyword` methods.
        - Added a test for the `getItemsSortedByCommentCountAndTopicId` method to handle cases with no comments.
4. **Update README and LICENSE Files:**
    - README.md:
        - Updated project description and usage instructions.
        - Added detailed setup and configuration steps.
        - Included contribution guidelines.
    - LICENSE:
        - Added the appropriate license for the project to ensure proper usage and distribution.
 
