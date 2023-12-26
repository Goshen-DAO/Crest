import Image from 'next/image';

const ProfilePicture = () => {
  return (
    <div>
      {/* Use the Image component */}
      <Image
        src="https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/user-icon.png"
        alt="User Icon"
        width={50} // Set the desired width (in pixels)
        height={50} // Set the desired height (in pixels)
      />
    </div>
  );
};

export default ProfilePicture;