![Parsons Puzzlers' logo](parsons-logo.png)\
2024 Software Engineering 2's Parsons Puzzlers\
*Celeste Emery ('24), Seth Tan ('23), Aryan Pradhan ('23), and Andrew Bukowski ('23)*

# NCHS Parsons Problems
## Overview
Parsons problems are a type of draggable code puzzle, where the user rearranges the code blocks to arrange functioning code.\
Users, as of this build of NCHS Parsons Problems, can:
1. Solve a default parsons problem on the homepage
2. Upload custom problems (via local files, including .txt, .java, and .py) to solve as a parsons problem
3. Navigate and select problems from a database of previously uploaded problems
4. Upload custom problems (via local files) to the database for other users to use

## Platform Requirements
Can be run on any platform, but requires React installation.\
Optionally, use Github Codespaces to code on the browser (useful for Chromebooks). *However, Github Codespaces gives a 'failed to fetch' error when trying to access the database. We think this is an issue with routing, since Codespaces redirects ports to a custom domain (ie. not "http://localhost/...")*

## Installation/configuration instructions
Requires React installed.\
Install necessary React dependencies/packages to the repository's back/frontend located respectively at `/parsons-problems/server/` and `/parsons-problems/client/` with `npm install` (`npm i` for short). Avoid installing packages directly to the root, to reduce redundancies. 

## Running the app
Clone this repository & install its required packages. To run the React app, run run `npm start` in `/server` and `/client`.\ Frontend/client is hosted on http://localhost:3000/, while backend/server is hosted on http://localhost:8000/. 

## Project Architecture
Frontend: React\
Backend: React

## Data schema
MySQL database
| Attribute | Description |
| --------- | ----------- |
| type     | File extension of the file which the problem is derived from |
| name     | Plaintext. Name of the problem. Displays in Database page & editable. |
| problem  | JSON (See table below). Editable via 'edit' in the Database page |
| date     | Date attributed to problem. Depending on the teacher, this could mean either due date or date the problem was assigned... up to interpretation. Displays in Database page & editable. |
| comments | Notes attributed to problem. Displays in Database page & editable. |
| id       | Hashcode attributed to problem. |

Puzzle json
| Attribute | Description |
| --------- | ----------- |
| name   | Plaintext. Parson block text contents |
| id     | Integer. Correct position of parson block. Starts at 0. |
| indent | Integer. Correct indent position of parson block (indentation not implemented yet). wrt problems currently in the database, this attribute might not be in the puzzle JSON... |

## Known issues
- [ ] Updating problems in the database does not work in some places
- [ ] With huge parsons problems, drag-and-drop + its animation is laggy (see Great Gatsby Ch 1 'problem')

*See 'Final heuristic evaluation' and 'Final user testing' in the Trello board for more details...*

## Remaining user stories
- [ ] Users should be able to grade certain blocks by an arbitrary order (like comments - they don't affect a program's execution, after all)
- [ ] Users should be able to indent parson blocks
- [ ] Users should be able to base a problem's grading off of blocks' # of indentations
- [ ] In the database page, users should be able to select an entire row to redirect users to a problem
- [ ] (?) In the database page, users should be able to double-click on a textbox area to edit the text WITHOUT using a dialogue / modal
- [ ] Users should be able to log in as a teacher or student user.
- [ ] Teacher users should be able to upload/edit problems to the database exclusively

*See Trello board's Product Backlog for more details...*
