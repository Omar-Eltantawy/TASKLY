import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import Input from "@/shared/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center text-display-lg justify-center bg-background ">
      <div>
        <Input label="Full name" type="text" placeholder="Enter name..." />
        <Input label="Full name" type="text" placeholder="Enter name..." />
        <Button disabled={true} variant="primary">
          Primary action
        </Button>
        <Button variant="secondary">Secondary action</Button>
        <Button variant="ghost">ghost action</Button>
        <br />

        <Icon name="event" />
      </div>
    </div>
  );
}
