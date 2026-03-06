import { useState } from "react";
import { Input } from "@/react-app/components/ui/input";
import { Label } from "@/react-app/components/ui/label";
import { Button } from "@/react-app/components/ui/button";
import { Checkbox } from "@/react-app/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/react-app/components/ui/select";
import { CheckCircle, Send, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919494551884";
const YOUTUBE_VIDEO_ID = "TmcwO9WadjU";

interface FormData {
  fullName: string;
  age: string;
  location: string;
  qualification: string;
  email: string;
  phone: string;
  videoWatched: boolean;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    age: "",
    location: "",
    qualification: "",
    email: "",
    phone: "",
    videoWatched: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.qualification) newErrors.qualification = "Qualification is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit number";
    }

    setErrors(newErrors as Partial<FormData>);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowSuccess(true);

    const message = `Hello! I'm interested in connecting with you.

*Contact Details:*
━━━━━━━━━━━━━━━
📋 Full Name: ${formData.fullName}
🎂 Age: ${formData.age}
📍 Location: ${formData.location}
🎓 Qualification: ${formData.qualification}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
🎬 Video Watched: ${formData.videoWatched ? "Yes" : "No"}
━━━━━━━━━━━━━━━

Looking forward to hearing from you!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 2000);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (showSuccess) {
    return <SuccessAnimation />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-800">ConnectNow</span>
          </div>
          <div className="text-sm text-slate-500">Business Inquiry Form</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Video Section */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-200/60">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-white font-semibold text-lg">Watch Before You Apply</h2>
              <p className="text-blue-100 text-sm mt-1">Learn more about our services and opportunities</p>
            </div>
            <div className="aspect-video bg-slate-900">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="Information Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h1 className="text-white font-semibold text-xl">Contact Information</h1>
            <p className="text-slate-300 text-sm mt-1">Fill in your details to connect with us via WhatsApp</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Full Name"
                error={errors.fullName}
                required
              >
                <Input
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-11"
                />
              </FormField>

              <FormField
                label="Age"
                error={errors.age}
                required
              >
                <Input
                  type="number"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="h-11"
                />
              </FormField>

              <FormField
                label="Location"
                error={errors.location}
                required
              >
                <Input
                  placeholder="City, State/Country"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="h-11"
                />
              </FormField>

              <FormField
                label="Qualification"
                error={errors.qualification as string}
                required
              >
                <Select
                  value={formData.qualification}
                  onValueChange={(value) => handleInputChange("qualification", value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high_school">High School</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">Ph.D.</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Email Address"
                error={errors.email}
                required
              >
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-11"
                />
              </FormField>

              <FormField
                label="Phone Number"
                error={errors.phone}
                required
              >
                <Input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-11"
                />
              </FormField>
            </div>

            {/* Video Watched Checkbox */}
            <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="videoWatched"
                  checked={formData.videoWatched}
                  onCheckedChange={(checked) => handleInputChange("videoWatched", !!checked)}
                  className="mt-0.5"
                />
                <label
                  htmlFor="videoWatched"
                  className="text-sm text-slate-700 cursor-pointer leading-relaxed"
                >
                  <span className="font-medium text-slate-800">I have watched the video above</span>
                  <span className="block text-slate-500 mt-0.5">
                    Please watch the complete video before submitting your inquiry
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25 transition-all duration-200"
              >
                <Send className="w-5 h-5 mr-2" />
                Send via WhatsApp
              </Button>
              <p className="text-center text-xs text-slate-400 mt-3">
                Your information will be sent securely via WhatsApp
              </p>
            </div>
          </form>
        </section>

        {/* Footer */}
        <footer className="text-center mt-10 pb-8">
          <p className="text-sm text-slate-400">
            © 2024 ConnectNow. Secure & Professional Business Inquiries.
          </p>
        </footer>
      </main>
    </div>
  );
}

function FormField({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function SuccessAnimation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center">
      <div className="text-center px-6">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/30 animate-[bounce_1s_ease-in-out]">
            <CheckCircle className="w-16 h-16 text-white animate-[pulse_1s_ease-in-out]" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-green-400/30 animate-ping" />
        </div>

        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Submission Successful!
        </h2>
        <p className="text-slate-500 text-lg mb-2">
          Redirecting you to WhatsApp...
        </p>
        <p className="text-slate-400 text-sm">
          Please wait while we connect you
        </p>

        <div className="mt-8 flex justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce [animation-delay:0ms]" />
          <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce [animation-delay:150ms]" />
          <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
