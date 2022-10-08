import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(0);
  const [content, setContent] = useState("");
  const [creator, setCreator] = useState("");
  const [creatorRegion, setCreatorRegion] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getData").then((response) => {
      setListOfUsers(response.data);
    });
    if (!search) {
      setSearchResult([]);
    } else {
      const asyncFC = async () => {
        const data = await Axios.get(
          `http://localhost:3001/search/${search}`
        ).then((response) => {
          setSearchResult(response.data);
        });
      };
      asyncFC();
    }

    console.log(searchResult);
  }, [search]);

  const createDocument = () => {
    Axios.post("http://localhost:3001/createData", {
      title,
      pageStart,
      pageEnd,
      content,
      creator,
      creatorRegion,
      createDate,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          title,
          pageStart,
          pageEnd,
          content,
          creator,
          creatorRegion,
          createDate,
        },
      ]);
    });
  };

  const UpdateData = (id) => {
    console.log(title);
    Axios.put("http://localhost:3001/updateData", {
      id: id,
      title: title,
      pageStart: pageStart,
      content: content,
    }).then((response) => {
      setListOfUsers(
        listOfUsers.map((val) => {
          return val._id == id
            ? { _id: id, title: title, pageStart: pageStart, content: content }
            : val;
        })
      );
    });
  };

  return (
    <div classtitle="App">
      <input
        type="text"
        placeholder="search..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <div>
        {searchResult.map((user) => {
          return (
            <>
              <ul>
                <Link to={`/content/${user._id}`}>
                <a>
                <li>{user.title}</li>
                </a>
                </Link>
              </ul>
            </>
          );
        })}
      </div>
      <div classtitle="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h1>{user._id}</h1>
              <h1>title: {user.title}</h1>
              <h1>pageStart: {user.pageStart}</h1>
              <h1>content: {user.content}</h1>
              <button onClick={() => UpdateData(user._id)}>Update</button>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="text"
          placeholder="title..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="pageStart..."
          onChange={(event) => {
            setPageStart(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="pageEnd..."
          onChange={(event) => {
            setPageEnd(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="content..."
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="creator..."
          onChange={(event) => {
            setCreator(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="creator region..."
          onChange={(event) => {
            setCreatorRegion(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="create date...."
          onChange={(event) => {
            setCreateDate(event.target.value);
          }}
        />
        <button onClick={createDocument}> Create User </button>
      </div>
    </div>
  );
}

export default Home;
