import * as React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import {styled} from "@mui/material/styles";

const CustomAvatar = styled(Avatar)`
  background: #FFFFFF
`
// To get Icons Slug - https://github.com/simple-icons/simple-icons/blob/master/slugs.md

export default function SkillChips({ ...props}) {
  const foundSkill = props?.skills?.find(skill => skill.slug === props?.skill?.name);
  const avtarSrc = `https://cdn.simpleicons.org/${foundSkill?.icon || ""}`;
  const loadAvtar = foundSkill?.icon ? { avatar: <CustomAvatar alt={foundSkill?.name || ""} src={avtarSrc} />} : {}
  return (
    <Chip
      label={foundSkill?.name || ""}
      variant="outlined"
      {...props}
      {...loadAvtar}
    />
  );
}
