export const notifications = [
  {
    field: 'newNotifi',
    name: 'Tin mới',
  },
  {
    field: 'statusTeam',
    name: 'Trạng thái team',
  },
  {
    field: 'campian',
    name: 'Campian',
  },
];

export const notificationsType = [
  {
    name: 'Chưa xem',
    seenStatus: false,
    options: [
      {
        name: 'Đánh dấu là đã đọc',
        icon: 'check-square',
      },
      {
        name: 'Xoá',
        icon: 'trash',
      },
    ],
  },
  {
    name: 'Đã xem',
    seenStatus: true,
    options: [
      {
        name: 'Xoá',
        icon: 'trash',
      },
    ],
  },
];

export const notificationOptions = [
  {
    name: 'Đánh dấu là đã đọc',
    icon: 'check-square',
  },
  {
    name: 'Xoá',
    icon: 'trash',
  },
];

export const settingOptions = [
  {
    name: 'Đánh dấu tất cả là đã đọc',
    icon: 'check-square',
  },
  {
    name: 'Xoá tất cả',
    icon: 'trash',
  },
];

