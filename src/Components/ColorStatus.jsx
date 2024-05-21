export const getStatusColor = (type) => {
    switch (type) {
      case 'Enquiry':
        return '#1890ff'; // Blue color for Enquiry
      case 'Not Interested':
        return '#FF4D4F'; // Red color for Not Interested
      case 'Unpaid Registration':
        return '#faad14'; // Yellow color for Unpaid Registration
      case 'Paid Registration':
        return '#52c41a'; // Green color for Paid Registration
      case 'Admissions Letter Sent':
        return '#d9d9d9'; // Grey color for Admissions Letter Sent
      case 'Converted':
        return '#722ed1'; // Purple color for Converted
      case 'Admitted':
        return '#87d068'; // Lime color for Admitted
      default:
        return '#000000'; // Black color as default
    }
  };

export const getStatusBadgeColor = (statusType) => {
    switch (statusType) {
      case 'Enquiry':
        return 'badge-primary'; // Set the class for Enquiry status
      case 'Not Interested':
        return 'badge-danger'; // Set the class for Not Interested status
      case 'Unpaid Registration':
        return 'badge-warning'; // Set the class for Unpaid Registration status
      // Add more cases for other status types as needed
      default:
        return 'badge-secondary'; // Default class if status type doesn't match any case
    }
  };
  