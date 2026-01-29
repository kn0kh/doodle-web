import Sphere3D from "@/components/3D/Sphere-3D";
export default function SphereArea({
  secretVectorDir,
  guessVecDirs,
}: {
  secretVectorDir: [number, number, number];
  guessVecDirs: [number, number, number][];
}) {
  return (
    <div className="sphere">
      <Sphere3D secretVectorDir={secretVectorDir} guessVecDirs={guessVecDirs} />
    </div>
  );
}
