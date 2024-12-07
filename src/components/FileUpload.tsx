import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "text/plain") {
        setSelectedFile(file);
        toast({
          title: "File selected",
          description: `Selected file: ${file.name}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please select a .txt file",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file first",
      });
      return;
    }

    // Here you would typically send the file to your server
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      console.log("File contents:", text);
      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} has been processed`,
      });
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col gap-2">
        <label htmlFor="file-upload" className="text-sm font-medium">
          Upload Text File
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-primary file:text-primary-foreground
            hover:file:bg-primary/90
            file:cursor-pointer"
        />
      </div>
      <Button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="w-full"
      >
        Upload
      </Button>
    </div>
  );
};

export default FileUpload;