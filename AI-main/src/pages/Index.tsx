import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FileUpload from "@/components/FileUpload";
import BackgroundRemoval from "@/components/BackgroundRemoval";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setProcessedImageUrl(null);
    
    // Create preview URL for the original image
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setOriginalImageUrl(url);
    }
  };

  const handleProcessed = (processedUrl: string) => {
    setProcessedImageUrl(processedUrl);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOriginalImageUrl(null);
    setProcessedImageUrl(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {!selectedFile ? (
        <>
          <Hero />
          
          {/* Upload Section */}
          <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="gradient-text">Start Editing</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Upload your photo or video to begin the AI-powered editing process
                </p>
              </div>
              
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          </section>
        </>
      ) : (
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Editor Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">AI Photo Editor</h1>
                <p className="text-muted-foreground">
                  Transform your image with professional AI tools
                </p>
              </div>

              {/* Editor Interface */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Panel - Tools */}
                <div className="lg:col-span-1">
                  <Card className="glass-card p-6">
                    <h3 className="text-lg font-semibold mb-4">AI Tools</h3>
                    
                    <Tabs defaultValue="background" className="w-full">
                      <TabsList className="grid w-full grid-cols-1">
                        <TabsTrigger value="background">Background Removal</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="background" className="mt-4">
                        {selectedFile && selectedFile.type.startsWith('image/') && (
                          <BackgroundRemoval 
                            imageFile={selectedFile} 
                            onProcessed={handleProcessed}
                          />
                        )}
                      </TabsContent>
                    </Tabs>
                  </Card>
                </div>

                {/* Right Panel - Preview */}
                <div className="lg:col-span-2">
                  {originalImageUrl && processedImageUrl ? (
                    <BeforeAfterSlider
                      beforeImage={originalImageUrl}
                      afterImage={processedImageUrl}
                      onReset={handleReset}
                    />
                  ) : originalImageUrl ? (
                    <Card className="glass-card overflow-hidden">
                      <div className="p-4 border-b border-border/20">
                        <h3 className="text-lg font-semibold">Original Image</h3>
                      </div>
                      <div className="p-4">
                        <img 
                          src={originalImageUrl} 
                          alt="Original" 
                          className="w-full h-96 object-contain rounded-lg"
                        />
                      </div>
                    </Card>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
