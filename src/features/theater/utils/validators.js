export const validateSeatNumber = (seatNumber) => {
  const regex = /^[A-F][1-2]?[0-9]$/;
  if (!regex.test(seatNumber)) return false;
  const row = seatNumber.charAt(0);
  if (!"ABCDEF".includes(row)) return false;
  const seatNum = parseInt(seatNumber.slice(1));
  return seatNum >= 1 && seatNum <= 30;
};
