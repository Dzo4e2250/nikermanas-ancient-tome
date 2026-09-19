import VranaOrnament from "@/components/VranaOrnament";

const OrnamentalDivider = () => {
  return (
    <div className="flex items-center justify-center my-8">
      <div className="flex items-center text-ornament">
        <div className="w-8 h-px bg-ornament"></div>
        <VranaOrnament className="mx-4 h-7" />
        <div className="w-8 h-px bg-ornament"></div>
      </div>
    </div>
  );
};

export default OrnamentalDivider;