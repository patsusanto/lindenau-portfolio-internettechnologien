"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/components/translation-provider";
import { sendContactEmailAction } from "@/app/actions";
import { useToast } from "@/components/toast-provider";

export default function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      const result = await sendContactEmailAction(formState);
      
      if (result.success) {
        toast({
          title: t('success'),
          description: t('messageSentSuccessfully'),
          type: "success",
        });
        
        // Reset form
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: t('error'),
          description: result.message || t('failedToSendMessage'),
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: t('error'),
        description: t('failedToSendMessage'),
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">{t('name')}</Label>
        <Input
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder={t('yourName')}
          required
          className="bg-white border-gray-300"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          placeholder={t('yourEmail')}
          required
          className="bg-white border-gray-300"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{t('subject')}</Label>
        <Input
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          placeholder={t('subjectOfMessage')}
          required
          className="bg-white border-gray-300"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder={t('yourMessage')}
          rows={6}
          required
          className="bg-white border-gray-300"
          disabled={isSubmitting}
        />
      </div>

      <Button
        type="submit"
        className="bg-black text-white hover:bg-black/80 px-8 py-2 w-full md:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            {t('sending')}
          </div>
        ) : (
          t('sendMessage')
        )}
      </Button>
    </form>
  );
}
