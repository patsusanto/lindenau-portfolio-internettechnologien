"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/components/translation-provider";

export default function ContactForm() {
  const { t } = useTranslation();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally handle form submission, but is non-functional as requested
    console.log("Form submitted:", formState);
    alert("Thank you for your message! This form is currently non-functional.");
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
        />
      </div>

      <Button
        type="submit"
        className="bg-black text-white hover:bg-black/80 px-8 py-2 w-full md:w-auto"
      >
        {t('sendMessage')}
      </Button>
    </form>
  );
}
