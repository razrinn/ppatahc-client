import * as React from "react";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

interface PropsUser {
  userId: string;
}

const UserIdPopover: React.FC<PropsUser> = ({ userId }) => {
  const copyToClipboard = () => {
    const element = document.createElement("input");
    element.type = "text";
    element.value = userId;
    element.style.position = "fixed"; // Prevent MS edge scrolling.
    document.body.append(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button onClick={copyToClipboard}>{userId}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>Copied to clipboard!</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default UserIdPopover;
