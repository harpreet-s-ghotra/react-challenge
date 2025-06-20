# Code Metal React Challenge - Sorting Tracks

This project uses [`json-server`](https://github.com/typicode/json-server) to serve a fake album dataset (`tracks.json`) with full REST API support. It's preloaded with 25,000+ realistic records including fake and real albums.

## Quick Start

This API server uses docker. Refer to [Docker Installation](https://docs.docker.com/engine/install/) manuals if you need to install docker.

### 1. Start the JSON API Server

From a terminal you can start the API server from the root directory of this repo.

```sh
docker compose up --build
```

This starts the server on:  
`http://localhost:3001/tracks`

## API Query Examples

### 🔸 Get All Albums (Unpaginated)

```sh
GET /tracks
```

### 🔸 Pagination

```sh
GET /tracks?_page=1&_limit=10
```

### 🔸 Sorting

```sh
GET /tracks?_sort=release_date&_order=desc
```

### 🔸 Filter by Genre

```sh
GET /tracks?genre=rock
```

### 🔸 Filter by Artist

```sh
GET /tracks?artist=Eagles
```

### 🔸 Filter by Decade (e.g. 1970s)

```sh
GET /tracks?release_year_gte=1970&release_year_lte=1979
```

### 🔸 Combine Filters

```sh
GET /tracks?genre=pop&release_year=1983
```

### 🔸 Top 5 Rated Jazz Albums

```sh
GET /tracks?genre=jazz&_sort=rating&_order=desc&_limit=5
```

### 🔸 Search by Keyword (track, album, or artist)

```sh
GET /tracks?q=California
```

### 🔸 Get Album by ID

```sh
GET /tracks/25003
```

## 🛠 Dev Notes

- Data is served read-only for this challenge.
- Port `3001` is mapped from the container to your local machine.

## 🧑‍💻 Code Challenge Instructions

Create a React application at the root of this repository (e.g., using Vite or Create React App).

### 🎯 Your task

Build a user interface that interacts with the provided JSON API at `http://localhost:3001/tracks`.

### 🛠 Features to Implement

1. **Track List View**  
   Display a searchable and filterable data grid of tracks. Each row should show at least:
   - Track Name
   - Artist
   - Album Name
   - Genre
   - Release Year
   - Rating

2. **Search & Filter**
   - Full-text search (by name, artist, album, etc.)
   - Genre and decade filters (optional: dropdown or checkboxes)
   - Sort by rating or release year

3. **Details View**
   Clicking on a row should display additional track information.

   Implement this in **two ways**:
   - A **modal** that appears without leaving the page
   - A **dedicated route** (e.g., `/tracks/:id`) that shows the same details

   > Feel free to re-use the same component in both places.

4. **Responsiveness**
   - Should work well on different screen sizes.

### ✅ Bonus (Optional)

If you have time and want to go further:

- Add pagination or infinite scroll

## Evaluation Criteria

- Clarity and structure of your code
- Reasonable and clean component breakdown
- Thoughtfulness in handling data (loading states, empty states, etc.)
- Clean, accessible, and user-friendly UI

⏱ This challenge is designed to be completed in **2–3 hours**. Don’t worry about pixel-perfect styling, focus on architecture, clarity, and usability.

## 📤 Submission Instructions

- Fork or clone the private repo we invited you to.

- Create a branch: takehome/`<your-name>`

- Submit a PR when finished.

- Include a README.md with:

  - Setup steps
  - Explanation of your approach
  - Instructions to run the pipeline

Happy Coding! 🚀
