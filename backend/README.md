# CMSC 162 Final Project Backend Folder

### Configure environment:

1. Make sure you have Python 3.12 installed.
2. `cd` into the backend folder.
3. Install poetry:

```
pip install poetry --user
```

4. Install the dependencies:

```bash
poetry install
```

5. Activate the virtual environment:

```bash
poetry shell
```

### To run the backend server:

1. `cd` into the backend folder.
2. Activate the virtual environment:

```bash
poetry shell
```

3. Run the server:

```bash
uvicorn main:app --reload --env-file .env
```
