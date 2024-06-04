import { useContext, useMemo } from "react";
import { Bell } from "react-feather";
import { Badge, Button, DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledDropdown } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Fragment } from "react";
import Avatar from "../../components/avatar/Avatar";
import { completePhotoPath, formatDateToMonthShort } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import AdminLayoutContext from "../../context/AdminLayoutContext";

const Notification = () => {
  const { t } = useTranslation();

  const adminLayoutContext = useContext(AdminLayoutContext);
  const { notificationList, readNotification, totalUnreadNotification, readAllNotification } = adminLayoutContext;

  const renderNotificationItems = useMemo(() => {
    return (
      <PerfectScrollbar
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false,
        }}
      >
        {notificationList.length > 0 ? (
          notificationList.map((notification) => {
            return (
              <Fragment>
                <Media
                  className={`d-flex align-items-center py-1 px-1 cursor-pointer ${notification.read === 1 ? "unread-notification" : ""}`}
                  key={notification._id}
                  onClick={() => readNotification(notification)}
                >
                  <Fragment>
                    <Media left>
                      {notification.sender.avatar ? (
                        <Avatar
                          img={completePhotoPath(notification.sender.avatar)}
                          imgHeight="36"
                          imgWidth="36"
                          status={t(`account_status_mapping.${notification.sender.status}`, { defaultValue: "" })}
                        />
                      ) : (
                        <Avatar
                          content={notification.sender.fullName || "G"}
                          initials
                          imgHeight="36"
                          imgWidth="36"
                          status={t(`account_status_mapping.${notification.sender.status}`, { defaultValue: "" })}
                        />
                      )}
                    </Media>
                    <Media body>
                      <div className="ps-1 text-white">
                        Bạn nhận được một công việc mới !
                        <small className="notification-text ps-2">{formatDateToMonthShort(notification.createdAt)}</small>
                      </div>
                      <small className="notification-text ps-1">Người phân công: {notification.sender.fullName}</small>
                    </Media>
                  </Fragment>
                </Media>
              </Fragment>
            );
          })
        ) : (
          <div className="d-flex justify-content-center mt-1 mb-1">Không có dữ liệu !</div>
        )}
      </PerfectScrollbar>
    );
  }, [notificationList, t, readNotification]);
  return (
    <UncontrolledDropdown tag="li" className="dropdown-notification nav-item mr-25">
      <DropdownToggle tag="a" className="nav-link" href="/" onClick={(e) => e.preventDefault()}>
        <Bell size={21} />
        {totalUnreadNotification > 0 && (
          <Badge pill color="danger" className="badge-up">
            {totalUnreadNotification}
          </Badge>
        )}
      </DropdownToggle>
      <DropdownMenu tag="ul" right className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex justify-content-between" tag="div" header>
            <h4 className="notification-title mb-0">Thông báo</h4>
            {totalUnreadNotification > 0 && (
              <Badge tag="div" color="light-primary" pill>
                + {totalUnreadNotification} thông báo mới
              </Badge>
            )}
          </DropdownItem>
        </li>
        {renderNotificationItems}
        {notificationList.length > 0 && (
          <li className="dropdown-menu-footer">
            <Button color="primary" block className="btn btn-primary w-100" onClick={() => readAllNotification(1)}>
              Xem tất cả
            </Button>
          </li>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
export default Notification;
