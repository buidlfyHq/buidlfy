import { FC, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { IRootState } from "redux/root-state.interface";
// import { getPublication } from "redux/widget/widget.actions";
import "styles/components.css";

interface ILensterWidget {
  i: string;
  backgroundColor: string;
  publicationId: string;
  profileId: string;
  ownedBy: string;
}

const LensterWidget: FC<ILensterWidget> = ({
  publicationId,
  profileId,
  ownedBy,
}) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getPublication({ publicationId: "0x013cee-0x0b41" }));
  // }, []);
  // const profileId = useSelector((state: IRootState) => state.widget.profileId);
  // const postId = useSelector((state: IRootState) => state.widget.publicationId);
  // const ownedBy = useSelector((state: IRootState) => state.widget.ownedBy);
  // console.log(postId, "postId");
  // console.log(profileId, "profileid");
  // console.log(ownedBy, "ownedby");

  return (
    <div className="">
      <h2>POST ID - {publicationId}</h2>
      <h2>PROFILE ID - {profileId}</h2>
      <h2>OWNED BY - {ownedBy}</h2>
    </div>
  );
};

export default LensterWidget;
