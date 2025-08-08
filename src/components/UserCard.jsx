const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl, skills } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="w-full max-h-[438px] overflow-hidden">
        <img
          src={photoUrl}
          alt="user photo"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        {skills && <p>{skills}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Intersted</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
