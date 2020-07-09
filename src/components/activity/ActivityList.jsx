import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Activity from './Activity';
import {
  BrowserRouter as
    Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './ActivityList.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  id: state.id,
  admin: state.admin,
});

function ActivityList({ id, admin, history }) {
  const [purchasedActivities, setPurchasedActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8000/users/${id}/activities`)
      .then((res) => res.data)
      .then((data) => {
        setPurchasedActivities(data);
        Axios.get('http://localhost:8000/activities')
          .then((res) => res.data)
          .then((data) => {
            setAllActivities(data);
          });
      });
  }, []);

  return (
    <div className="backActivityList">
      <div className="allActivityList">
        <section className="TitleActivityList">
          <header>
            <h1>Mes Activités</h1>
            <p>Veuillez cocher les Activités de votre établisment (20 activités maximum)</p>
          </header>
          {admin === 1
          && <Link to="/manageactivities">Admin</Link>}
          <button type="button" className="ValButActivityList" onClick={() => console.log(purchasedActivities)}>
            Valider
          </button>
        </section>
        {allActivities.map((activity) => (
          <Activity
            activity={activity}
            toggle={() => {
              const purchasedIndex = purchasedActivities.findIndex((purchasedActivity) => purchasedActivity.id === activity.id);
              const isPurchased = (purchasedIndex !== -1);
              if (isPurchased) {
                setPurchasedActivities(
                  purchasedActivities.filter((purchasedActivity) => purchasedActivity.id !== activity.id),
                );
              } else {
                setPurchasedActivities(
                  [...purchasedActivities, activity],
                );
              }
            }}
            initialChecked={purchasedActivities.findIndex((purchasedActivity) => purchasedActivity.Activities_id === activity.id) !== -1}
          />
        ))}
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(ActivityList);
