import React, { useEffect, useState } from "react";
import moment from 'moment';
import '../styles/NotificationsUtilisateur.css'; 

function NotificationsUtilisateur() {
  const [notifications, setNotifications] = useState([]);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const utilisateurId = localStorage.getItem("uid");
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const notificationsPerPage = 4;

  const fetchNotifications = (page) => {
    const offset = (page - 1) * notificationsPerPage;
    fetch(`http://localhost:3000/notification/notifications/${utilisateurId}?limit=${notificationsPerPage}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.notifications) {
          setNotifications(data.notifications);
        } else {
          setNotifications([]);
        }
        setTotalNotifications(data.totalNotifications);
        setHasNewNotifications(data.notifications && data.notifications.some(notification => notification.isNew));
      })
      .catch((error) => console.error("Erreur lors de la récupération des notifications:", error));
  };

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [utilisateurId, currentPage]);

  const markNotificationAsRead = (notificationId) => {
    fetch(`http://localhost:3000/notification/notifications/${utilisateurId}/mark-as-read/${notificationId}`, {
      method: 'PUT',
    })
      .then(() => {
        fetchNotifications(currentPage); // Rafraîchir les notifications après mise à jour
      })
      .catch((error) => console.error("Erreur lors de la mise à jour des notifications:", error));
  };

  const deleteNotification = (notificationId) => {
    fetch(`http://localhost:3000/notification/notifications/${notificationId}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchNotifications(currentPage); // Rafraîchir les notifications après suppression
      })
      .catch((error) => console.error("Erreur lors de la suppression de la notification:", error));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalNotifications / notificationsPerPage);

  return (
    <div className="notifications-container">
      <h2>Vos notifications :</h2>
      {hasNewNotifications && <div className="new-notification-badge">Nouveau</div>}
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} className={`notification ${notification.isNew ? 'new' : ''}`}>
            <p>{notification.message}</p>
            <p className="notification-date">
              Date: {moment(notification.dateHeure).locale('fr').format('LLLL')}
            </p>
            {notification.isNew && (
              <button 
                onClick={() => markNotificationAsRead(notification.id)} 
                className="btn btn-primary"
              >
                Marquer comme lu
              </button>
            )}
            <button
              onClick={() => deleteNotification(notification.id)}
              className="btn btn-danger"
            >
              Supprimer
            </button>
          </div>
        ))
      ) : (
        <p>Vous n'avez aucune notification pour le moment.</p>
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index} 
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === (index + 1) ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NotificationsUtilisateur;
