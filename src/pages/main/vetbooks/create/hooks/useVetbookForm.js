import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useVetbookForm = () => {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const [files, setFiles] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onTouched',
  })

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async ({ formData }) => {
      // TODO: Implement API call
      console.log('Submitting vetbook:', formData)
    },
    onSuccess: () => {
      navigate('/profile')
    },
    onError: (error) => {
      console.error('Error creating vetbook:', error)
    },
  })

  const onUpload = useCallback(
    (uploadedFiles) => {
      const newFiles = uploadedFiles.filter(
        (file) => !files.some((f) => f.name === file.name)
      )
      if (newFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
      }
    },
    [files]
  )

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.url) {
          URL.revokeObjectURL(file.url)
        }
      })
    }
  }, [files])

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('petName', data.petName)
    formData.append('petSpecies', data.petSpecies)
    formData.append('petWeight', data.petWeight)
    formData.append('petGender', data.petGender)

    files.forEach((fileObj) => {
      formData.append('files', fileObj.file)
    })

    mutate({ formData })
  }

  const watchedFields = {
    petName: watch('petName'),
    petSpecies: watch('petSpecies'),
    petWeight: watch('petWeight'),
    petGender: watch('petGender'),
  }

  const isFormValid =
    isValid &&
    watchedFields.petName &&
    watchedFields.petSpecies &&
    watchedFields.petWeight &&
    watchedFields.petGender

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    error,
    onUpload,
    onSubmit,
    isFormValid,
  }
}
