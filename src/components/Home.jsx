import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [checkList, setChecklist] = useState([]);
  const [inputName, setInputName] = useState(null);
  const [inputItem, setInputItem] = useState(null);
  const [checklistId, setChecklistId] = useState(0);
  const navigate = useNavigate();

  const getChecklistAPI = useCallback(async () => {
    await axios
      .get("http://94.74.86.174:8080/api/checklist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        setChecklist(response.data.data);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) navigate("/register");

    getChecklistAPI();
  }, [getChecklistAPI]);

  const handleCreate = async (eventType) => {
    if (eventType === 'checklist') {
      await axios
        .post(
          "http://94.74.86.174:8080/api/checklist",
          { name: inputName },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((response) => {
          getChecklistAPI();
          console.log(response);
        })
        .catch((err) => alert(err));
    }

    if (eventType === 'checklist') {
      await axios
        .post(
          `http://94.74.86.174:8080/api/checklist/${checklistId}/item`,
          { itemName: inputItem },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((response) => {
          getChecklistAPI();
          console.log(response);
        })
        .catch((err) => alert(err));
    }
  };

  const handleChange = (event, eventType) => {
    switch (eventType) {
      case "name":
        setInputName(event.target.value);
        break;
      case "item":
        setInputItem(event.target.value);
        break;
      default:
        setChecklistId(event.target.value);
        break;
    }
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://94.74.86.174:8080/api/checklist/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        alert("Checklist succesfully deleted");
        getChecklistAPI();
      })
      .catch((err) => alert(err));
  };

  const handleCheck = (id) => {
    const checklistItem = checkList.find((item) => item.id === id);
    const newChecklist = checkList.filter((item) => item.id !== id);
    checklistItem.checklistCompletionStatus =
      !checklistItem.checklistCompletionStatus;

    setChecklist([...newChecklist, checklistItem]);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <Fragment>
      <h1>Checklist</h1>
      <hr />
      <div>
        <input
          type="text"
          onChange={(e) => handleChange(e, "name")}
          name="name"
          placeholder="Insert checklist name"
        />
        <button onClick={() => handleCreate('checklist')}>Create Checklist</button>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => handleChange(e, "checklistId")}
          name="item"
          placeholder="Insert checklist id"
        />
        <input
          type="text"
          onChange={(e) => handleChange(e, "item")}
          name="item"
          placeholder="Insert item name"
        />
        <button onClick={() => handleCreate('checklistitem')}>Add Item</button>
      </div>
      {checkList &&
        checkList.map((checkItem) => (
          <>
            <hr />
            <div key={checkItem.id}>
              {`${checkItem.name} - id: ${checkItem.id} `}
              {/* <input type="checkbox" checked={checkItem.checklistCompletionStatus} onClick={() => handleCheck(checkItem.id)} /> */}
              <button type="button" onClick={() => handleDelete(checkItem.id)}>
                x
              </button>
            </div>
            
          </>
        ))}
      <hr />
      <button onClick={handleLogout}>Logout</button>
    </Fragment>
  );
};

export default Home;
