import React, { useEffect, useState } from "react";
import moment from 'moment';
import '../styles/NotificationsUtilisateur.css'; // Importez le fichier CSS ici

function NotificationsUtilisateur() {
  const [notifications, setNotifications] = useState([]);
  const utilisateurId = localStorage.getItem("uid");

  useEffect(() => {
    fetch(`http://localhost:3000/notification/notifications/${utilisateurId}`)
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des notifications:", error));
  }, [utilisateurId]);

  return (
    <div className="notifications-container">
      <h2>Vos notifications :</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} className="notification">
            <p>{notification.message}</p>
            <p className="notification-date">Date: {moment(notification.date).locale('fr').format('LLLL')}</p>
          </div>
        ))
      ) : (
        <p>Vous n'avez aucune notification pour le moment.</p>
      )}
    </div>
  );
}

export default NotificationsUtilisateur;