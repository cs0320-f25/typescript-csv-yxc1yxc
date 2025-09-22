# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    As an user, I should be able to receive informative error messages, so I can understand what's wrong and fix it. (Extensibility, Both)
    As an user, I can pass in different input types, so It provides more freedom to the csv source. (Extensibility, LLM)
    As an user, I should expect the parser to be able to tolerate edge cases such as comma within quotes, so I don't have to worry about the input. (Functionality, Both)
    As an user, I should expect the parser to provide comprehensive documentation, so I can have easier time when trying to use it. (Functionality, Both)


    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    My initial idead are: error handling, better edge case tolerance, good documentation and header support. The LLM mentions everything I've said, but I though instead of header support, the different input types mentioned by the LLM is more important. So I exchanged that one. The LLM mentioned something about the support of filtering specific rows, but for this one I think it should be the caller who does that.

### Design Choices

### 1340 Supplement
I chose linkedlist as the datastructure. For json, simply do a nested structure where in each level, there is a data field and a nested same field, serving as "next node" in linkedlist.
For the schema implementation I mainly asked LLM. 

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests: I tested for some parsing edge cases, found one error on comma within quotes. I also tested for zod schema, including normal usage and error handling.
#### How To…

#### Team members and contributions (include cs logins): Individual Sprint

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): For LLM, I got some help for task B, when proposing enhancements to the parser. I also asked about how to return an error to the caller instead of using console.log. However, the AI didn't keep the default string[][] logic, so I manually solved it. For the supplemental challenge, I asked AI to explain how do I represent json data with linkedlist and how to make it a zod schema. The AI provided a valid answer. After implementing the schema, I then asked the AI to write some test on it.
#### Total estimated time it took to complete project: 2 hours
#### Link to GitHub Repo:  https://github.com/cs0320-f25/typescript-csv-yxc1yxc
